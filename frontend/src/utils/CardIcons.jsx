/* eslint-disable react-refresh/only-export-components */

const TrashIcon = () => {
    return (
        <svg 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          fill="none" stroke="currentColor" 
          strokeWidth={2} 
          width={15} 
          height={15}
        >
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
        </svg>
    );
};


const EditIcon = () => {
    return (
        <svg 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          fill="none" stroke="currentColor" 
          strokeWidth={2} 
          width={15} 
          height={15}
        >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
    );
};

const LabelIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15}>
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
    );
};

const CalendarIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth={2} width={15} height={15}>
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    );
};

const UserIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth={2} width={15} height={15}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    );
};

const CheckIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth={2} width={15} height={15}>
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
    );
};

const CoverIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth={2} width={15} height={15}>
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>
        </svg>
    );
};

const CloseIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        strokeWidth={2} width={16} height={16}>
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    );
};

export default {
    Trash: TrashIcon,
    Edit: EditIcon,
    Label: LabelIcon,
    Calendar: CalendarIcon,
    Check: CheckIcon,
    User: UserIcon,
    Cover: CoverIcon,
    Close: CloseIcon
};