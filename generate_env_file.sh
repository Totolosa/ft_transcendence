#!/bin/zsh
echo "BACKEND_PORT=3000
FRONTEND_PORT=8080
VUE_PHASE=serve
NEST_PHASE=start:dev
POSTGRESQL_PASSWORD=postgres_pass
POSTGRESQL_DATABASE=postgres_db
POSTGRESQL_PORT=5432
POSTGRESQL_USERNAME=postgres
POSTGRESQL_HOST=localhost
POSTGRESQL_POSTGRES_PASSWORD=postgres_pass
PGADMIN_PORT_HTTP=80
# PGADMIN_PORT_HTTPS=443
# PGADMIN_ENABLE_TLS=false
PGADMIN_EMAIL=pgadmin@example.com
PGADMIN_PASSWORD=pgadmin_pass
API_42_CLIENT_ID=
API_42_CLIENT_SECRET=
API_42_REDIRECT_URI=
JWT_MAX_AGE=86400" > .env