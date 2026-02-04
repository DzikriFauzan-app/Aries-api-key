FROM python:3.12-slim
COPY aries_v4_final.py .
RUN pip install fastapi uvicorn
EXPOSE 3333
CMD ["uvicorn", "aries_v4_final.py:app", "--host", "0.0.0.0", "--port", "3333"]
