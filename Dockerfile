FROM node:18-alpine3.15 as build
ARG REACT_APP_API_URL=http://localhost:5282/api
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/

RUN npm install
COPY . /app
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]