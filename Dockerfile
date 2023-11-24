FROM nginx

COPY ./dist/apps/gambling /etc/nginx/html/frontend-game-web
