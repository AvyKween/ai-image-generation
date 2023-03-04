
export interface FormType {
    labelName: string;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    handleInputChange: React.ChangeEventHandler;
    isSurpriseMe?: boolean
    handleSurpriseMe?: React.MouseEventHandler;
}