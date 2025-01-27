# Dockerfile
FROM nginx:alpine

# Удаляем дефолтный конфиг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфиг
COPY nginx.conf /etc/nginx/conf.d

# Копируем статические файлы
COPY ./static /usr/share/nginx/html

# Открываем порты
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]