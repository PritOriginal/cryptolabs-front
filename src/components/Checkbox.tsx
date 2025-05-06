export default function Checkbox({ checked, onChange, children }: { checked: boolean, onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined, children: React.ReactNode }) {
    return (
        <label htmlFor="details">
            <div className="checkbox">
                <input
                    type="checkbox"
                    name="details"
                    id="details"
                    checked={checked}
                    onChange={onChange}
                />
                {children}
            </div>
        </label>
    );
}
