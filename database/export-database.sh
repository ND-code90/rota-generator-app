#!/usr/bin/env bash

set -euo pipefail

# Local development database settings.
DATABASE_NAME="rota_generator_dev"
DATABASE_USER="rota_admin"
DATABASE_HOST="localhost"
DATABASE_PORT="3306"
MYSQLDUMP="/usr/local/mysql/bin/mysqldump"

# Save exports beside this script in database/backups.
SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIRECTORY="${SCRIPT_DIRECTORY}/backups"
TIMESTAMP="$(date "+%Y-%m-%d_%H-%M-%S")"
OUTPUT_FILE="${BACKUP_DIRECTORY}/${DATABASE_NAME}_${TIMESTAMP}.sql"

# Make newly created backup files readable only by the current Mac user.
umask 077
mkdir -p "${BACKUP_DIRECTORY}"

if [[ ! -x "${MYSQLDUMP}" ]]; then
  echo "MySQL export tool was not found at: ${MYSQLDUMP}"
  echo "Check that MySQL is installed before trying again."
  exit 1
fi

echo "Exporting database: ${DATABASE_NAME}"
echo "MySQL will now ask for the ${DATABASE_USER} password."

"${MYSQLDUMP}" \
  --host="${DATABASE_HOST}" \
  --port="${DATABASE_PORT}" \
  --user="${DATABASE_USER}" \
  --password \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  --set-gtid-purged=OFF \
  --no-tablespaces \
  --default-character-set=utf8mb4 \
  --result-file="${OUTPUT_FILE}" \
  --databases \
  "${DATABASE_NAME}"

echo "Export complete:"
echo "${OUTPUT_FILE}"
