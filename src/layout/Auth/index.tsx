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
const borderRed = ["border-danger", "ring-danger"];
const borderGrey = ["border-line/20", "ring-line/30"];

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
                <div className="modal-box w-11/12 max-w-sm bg-surface text-ink border border-line/10 rounded-lg overflow-y-auto no-scrollbar">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <h2 className="text-lg font-semibold">Enter password</h2>
                        <div className="relative w-full">
                            <Input
                                attrBtn={{
                                    type: showPassword ? "text" : "password",
                                    placeholder: "Enter Password",
                                    onChange: validateNumber,
                                    id: passwordId,
                                    className: `w-full px-3 py-2.5 border rounded-md bg-bg text-ink placeholder:text-muted focus:outline-none focus:ring-1 `,
                                }}
                            />

                            <Button
                                attrBtn={{
                                    className: "absolute right-0 top-0 bottom-0 px-3 text-muted hover:text-ink",
                                    onClick: () => setShowPassword(!showPassword)
                                }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </Button>
                        </div>

                        {(auth.errorMessage.length > 0 && password.length > 0 && !isChange) && (
                            <span className='text-danger text-sm'>{auth.errorMessage}</span>
                        )}

                        <Button
                            attrBtn={{
                                className: 'btn-solid w-full py-2.5 text-sm',
                                onClick: handleSubmit
                            }}
                        >
                            Login
                        </Button>

                    </div>
                </div>
            </dialog >

            <div id={divId} className="mx-auto px-4 md:px-8 h-screen flex flex-col max-w-6xl bg-bg text-ink">
                {children}
            </div>
        </>
    )
}

export default AuthLayout
