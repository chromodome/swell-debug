const ToastMessage = ({
    icon = '👋',
    msg = 'Welcome back stranger!',
    alignTop = false,
    color = 'text-gray-800'
}) => {
    return (
        <div
            className={`${
                alignTop ? 'items-start' : 'items-center'
            } px-2 flex gap-4 flex-nowrap text-xs ${color}`}>
            {icon && <span className="text-xl">{icon}</span>}
            <span className="flex-1 font-medium">{msg}</span>
        </div>
    );
};

export default ToastMessage;
