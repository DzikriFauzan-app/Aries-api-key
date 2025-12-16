"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuredLLMProvider = void 0;
const llmJail_1 = require("../security/llmJail");
const tokenGovernor_1 = require("../security/tokenGovernor");
class SecuredLLMProvider {
    constructor(inner, // Ubah ke public agar bisa diakses test
    governor = new tokenGovernor_1.TokenGovernor(4096)) {
        this.inner = inner;
        this.governor = governor;
        this.name = `Secured(${inner.name})`;
    }
    async generate(params) {
        (0, llmJail_1.jailCheck)(params.prompt);
        this.governor.consume(params.prompt.length);
        const res = await this.inner.generate(params);
        (0, llmJail_1.jailCheck)(res.text);
        this.governor.consume(res.text.length);
        return res;
    }
}
exports.SecuredLLMProvider = SecuredLLMProvider;
