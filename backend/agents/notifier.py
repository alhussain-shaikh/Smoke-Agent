from backend.utils.logger import logger

def notify(message: str):
# Extend: Slack/Email/Webhook etc.
    logger.info("NOTIFY: %s", message)