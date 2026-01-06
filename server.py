
# --- PROXY COMMAND TO NEO ENGINE ---
@app.route('/api/emergent/scan', methods=['GET'])
def proxy_emergent_scan():
    import requests
    try:
        # Aries (Otak) bertanya pada Neo Engine (Otot)
        response = requests.get('http://127.0.0.1:8080/api/emergent/scan', timeout=5)
        data = response.json()
        
        # Di sini Aries bisa memproses data sebelum dikirim ke FEAC
        # Misal: Menambahkan analisis AI berdasarkan API Key
        return jsonify(data)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/emergent/build', methods=['POST'])
def proxy_emergent_build():
    import requests
    try:
        payload = request.json
        # Aries memvalidasi perintah sebelum dikirim ke Neo Engine
        response = requests.post('http://127.0.0.1:8080/api/emergent/build', json=payload, timeout=10)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
