export default function Table({ header, children }: {header: string[], children: React.ReactNode}) {
    return (
        <table>
            <tr>
                {header.map((name) => (
                    <HeaderItem name={name} />
                ))}
            </tr>
            {children}
        </table>
    );
}

function HeaderItem({name}: {name: string}) {
    return(
        <th>{name}</th>
    )
}