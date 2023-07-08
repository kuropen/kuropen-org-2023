import {format} from 'date-fns'

interface DateViewProps {
    date?: string;
}

export default function DateView({ date }: DateViewProps) {
    const dateObject = new Date(date || '');
    return (<>{format(dateObject, 'yyyy/MM/dd')}</>);
}
