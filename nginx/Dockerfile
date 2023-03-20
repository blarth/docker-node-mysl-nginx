FROM nginx:latest

WORKDIR /usr/src/app

RUN chmod 777 /usr/src/app
COPY html /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d


ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]