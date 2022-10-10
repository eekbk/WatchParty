FROM node:8

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

EXPOSE 5432
CMD [ "npm", "start" ]
