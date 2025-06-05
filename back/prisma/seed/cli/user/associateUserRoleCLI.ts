import { createAssociationUserRole } from '../../models/user/associateUserRole'

async function main() {
  try {
    await createAssociationUserRole()
    console.log('✅ Roles successfully associated.')
  } catch (error) {
    console.error('❌ Error creating roles:', error)
    process.exit(1)
  }
}

main()