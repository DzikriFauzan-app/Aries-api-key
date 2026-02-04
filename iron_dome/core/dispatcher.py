from iron_dome.core.policy import is_protected
from iron_dome.ledger.ledger import append

def decide(actor: str, action: str, target: str):
    append(actor, action, target)
    if is_protected(target):
        raise Exception("IRON DOME: PROTECTED TARGET")
    return True
