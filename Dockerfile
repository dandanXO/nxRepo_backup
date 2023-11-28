FROM nginx
USER root
RUN ulimit -n 16383
COPY ./dist/apps/gambling /etc/nginx/html/frontend-game-web
