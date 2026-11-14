import type { GroupMiniType } from "@shared/schema/group.schema";


export function GroupsLinks({ groups }: { groups: GroupMiniType[] } ){
    return groups.map((group) => {
        return ( <p>Coucou ${group.groupName}</p>)
    })
}