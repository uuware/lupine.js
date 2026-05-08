// Access level constants
export const ACCESS_LEVELS = [
    { value: '0', label: 'Public' },
    { value: '2', label: 'Logged In' },
    { value: '3', label: 'Admin' },
    { value: '9', label: 'Site Admin' },
];
export const getAccessLabel = (val: string) => ACCESS_LEVELS.find((a) => a.value === String(val))?.label || 'Public';
export const getAccessLevelOptions = (selectedValue?: string) => ACCESS_LEVELS.map((al) => ({
    ...al,
    selected: String(al.value) === String(selectedValue),
}));
