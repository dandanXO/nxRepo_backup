FROM nginx

RUN apt-get update && apt-get install -y procps &&  \
    echo "net.core.netdev_max_backlog=8192" >> /etc/sysctl.conf && \
    echo "net.core.somaxconn=8192" >> /etc/sysctl.conf && \
    echo "fs.file-max=1577468" >> /etc/sysctl.conf && \
    echo "vm.swappiness=0" >> /etc/sysctl.conf && \
    echo "net.ipv4.tcp_fin_timeout=30" >> /etc/sysctl.conf && \
    sysctl -p && \
    echo "* soft nofile 16383" >> /etc/security/limits.conf && \
    echo "* hard nofile 16383" >> /etc/security/limits.conf && \
    ulimit -n 16383 && \
    ulimit -aH

COPY ./dist/apps/gambling /etc/nginx/html/frontend-game-web
