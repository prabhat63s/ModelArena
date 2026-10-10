'use client';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAuthentication, setAuthenticate, resetErrorMessage } from '@redux/reducers/AuthReducer';

// custom component
import Button from '@commonElements/Button';
import Input from '@commonElements/Input';

type Props = Readonly<{
    children: React.ReactNode;
}>

const divClassName = ["pointer-events-none", "blur-sm"];
const borderRed = ["border-red-800", "dark:border-red-500", "ring-red-800", "dark:ring-red-500"];
const borderGrey = ["border-gray-300", "dark:border-gray-600", "ring-gray-300", "dark:ring-gray-600"];

const AuthLayout: React.FC<Props> = ({ children }: Props) => {
    const modelName = 'auth-model';
    const divId = "main-content";
    const passwordId = 'password-field';

    const dispatch = useDispatch(); // use dispatch to dispatch actions
    const auth = useSelector(getAuthentication); // get authentication

    const [password, setPassword] = React.useState<string>('');
    const [isChange, setIsChange] = React.useState<boolean>(false);

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // useEffect to open modal when not authenticated and close when authenticated
    React.useEffect(() => {
        if (!auth.isAuthenticated) {
            (document.getElementById(modelName) as HTMLDialogElement).showModal(); //open modal
            (document.getElementById(divId) as HTMLDivElement).classList.add(...divClassName); //add class to div

            if (auth.errorMessage.length > 0 && password.length > 0 && !isChange) {
                (document.getElementById(passwordId))?.classList.add(...borderRed); //add class from input 
                (document.getElementById(passwordId))?.classList.remove(...borderGrey); //remove class from input
            } else {
                (document.getElementById(passwordId))?.classList.remove(...borderRed); //remove class from input
                (document.getElementById(passwordId))?.classList.add(...borderGrey); //add class from input 
            }

        } else {
            (document.getElementById(modelName) as HTMLDialogElement).close(); //close modal
            (document.getElementById(divId) as HTMLDivElement).classList.remove(...divClassName);
        }
    }, [auth, isChange, password.length]);

    // handle form submission
    const handleSubmit = (): void => {
        dispatch(setAuthenticate(password));
        setIsChange(false);
    }

    // handle password change and only accept number
    const validateNumber = (event: React.FormEvent): void => {
        setIsChange(true);
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (/^[0-9]+$/.test(value)) {
            setPassword(value);
        }
        else {
            target.value = target.value.slice(0, -1);
        }
        target.focus();
        dispatch(resetErrorMessage());
    }

    return (
        <>
            <dialog id={modelName} className='modal' >
                <div className="modal-box w-11/12 max-w-xl overflow-y-scroll no-scrollbar">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <h2> Enter Password </h2>
                        <div className="relative w-3/4">
                            <Input
                                attrBtn={{
                                    type: showPassword ? "text" : "password",
                                    placeholder: "Enter Password",
                                    onChange: validateNumber,
                                    id: passwordId,
                                    className: `w-full px-5 py-4 border rounded-full bg-gray-50 dark:bg-[#141313] focus:outline-none focus:ring-2 `,
                                }}
                            />

                            <Button
                                attrBtn={{
                                    className: "absolute right-0 top-0 bottom-0 px-2.5 py-2 rounded-full m-2  h-auto min-h-[50%] focus:ring-0",
                                    onClick: () => setShowPassword(!showPassword)
                                }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </Button>
                        </div>

                        {(auth.errorMessage.length > 0 && password.length > 0 && !isChange) && (
                            <span className='text-red-800 dark:text-red-500'>{auth.errorMessage}</span>
                        )}

                        <Button
                            attrBtn={{
                                className: 'btn btn-primary dark:btn-neutral h-8 ',
                                onClick: handleSubmit
                            }}
                        >
                            Login
                        </Button>

                    </div>
                </div>
            </dialog >

            <div id={divId} className={`controller mx-auto px-4 h-screen bg-gray-100 text-gray-900 dark:bg-[#1E1E1E] dark:text-white`}>
                {children}
            </div>
        </>
    )
}

export default AuthLayout
