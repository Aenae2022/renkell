import { createRoles } from '../../models/role/createRoles'

async function main() {
  try {
    await createRoles()
    console.log('✅ Roles successfully created.')
  } catch (error) {
    console.error('❌ Error creating roles:', error)
    process.exit(1)
  }
}

main()