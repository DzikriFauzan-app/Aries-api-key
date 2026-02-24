def get_response(msg):
    m = msg.lower()
    if "kubernetes" in m or "k8s" in m:
        return (
            "Kubernetes (K8s) adalah platform open-source untuk otomatisasi deployment, scaling, dan operasional "
            "container aplikasi. Di level S3 PhD, kita fokus pada High Availability (HA), Control Plane architecture, "
            "Etcd consistency, dan Custom Resource Definitions (CRD) untuk merekayasa infrastruktur yang self-healing "
            "dalam skala Enterprise (Production Grade)."
        )
    return "Ready."
