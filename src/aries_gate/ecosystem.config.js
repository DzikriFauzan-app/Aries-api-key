module.exports = {
  apps: [{
    name: 'ARIES-v5.0',
    script: 'aries_v5_port3333.py',
    interpreter: 'python3',
    cwd: './',
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3333
    }
  }]
}
