import { InputHTMLAttributes } from "react"
import { AiFillWarning } from "react-icons/ai"
import theme from "../../styles/theme"
import S from "./styles"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean,
    errorMessage?: string,
    variant?: 'default' | 'black'
    as?: any,
}

export const Input = (
    {
        hasError,
        errorMessage,
        variant = 'default',
        as = 'input',
        ...props
    }
    : InputProps) => {

    return (
        <S.Field>
            <S.Input
                as={as}
                hasError={!!hasError}
                {...props}
            />

            {!!hasError &&
                <S.Box>
                    <AiFillWarning size={18} color={theme.colors.error} />
                    <S.Message>
                        {errorMessage}
                    </S.Message>
                </S.Box>
            }
        </S.Field>
    )
}