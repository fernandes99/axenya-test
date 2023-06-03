import { useForm } from "react-hook-form";
import { Button, Form } from "../../../pages/parcerias/[slug]/index.styles";
import { GSheetService } from "../../../services/gsheet";
import { MailchimpService } from "../../../services/mailchimp/sendLead";
import { Input } from "../../input";
import { sendSalesForce } from "../../../services/salesforce";

const initialForm = {
    cnpj: '',
    fantasyName: '',
    contactName: '',
    phone: '',
    email: '',
    office: '',
    segment: '',
    amountEmployee: 0
}

interface IArtonFormProps {
    onSuccess: () => void,
    onError: () => void,
    setLoading: (isLoading: boolean) => void,  
    partner: {
        name: string,
        slug: string
    },
}

export const ArtonForm = ({ onSuccess, onError, setLoading, partner }: IArtonFormProps) => {
    const {
        setValue,
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm({
        defaultValues: initialForm
    });
    
    const onSubmit = handleSubmit(async data => {
        setLoading(true);

        try {
            await MailchimpService.sendLead({
                email_address: data.email,
                tags: [`form-partner-${partner.slug}`],
                status: 'subscribed',
                merge_fields: {
                    FNAME: data.contactName,
                    PHONE: data.phone,
                    COMPANY: partner.name,
                    SECTOR: data.segment,
                    COMMENT: '',
                }
            });
            await GSheetService.sendLeadPartnerForm(
                {...data, partner: partner.name}
            );
            await sendSalesForce({
                name: data.contactName,
                email: data.email,
                company: partner.name,
                phone: data.phone
            });
            onSuccess();
        }
        catch (error) {
            onError();
        }
        finally {
            setLoading(false);
        }
    });

    return (
        <Form onSubmit={onSubmit}>
            <Input
                placeholder="CNPJ"
                {...register("cnpj", {
                    required: true
                })}
                onChange={e => setValue('cnpj', e.target.value)}
                hasError={!!errors.cnpj}
                errorMessage={errors.cnpj?.message}
            />
            <Input
                placeholder="Nome fantasia"
                {...register("fantasyName", {
                    required: true
                })}
                onChange={e => setValue('fantasyName', e.target.value)}
                hasError={!!errors.fantasyName}
                errorMessage={errors.fantasyName?.message}
            />
            <Input
                placeholder="Nome de contato"
                {...register("contactName", {
                    required: true
                })}
                onChange={e => setValue('contactName', e.target.value)}
                hasError={!!errors.contactName}
                errorMessage={errors.contactName?.message}
            />
            <Input
                placeholder="Telefone de contato"
                {...register("phone", {
                    required: true
                })}
                onChange={e => setValue('phone', e.target.value)}
                hasError={!!errors.phone}
                errorMessage={errors.phone?.message}
            />
            <Input
                placeholder="Email de contato"
                {...register("email", {
                    required: true
                })}
                onChange={e => setValue('email', e.target.value)}
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
            />
            <Input
                placeholder="Cargo"
                {...register("office", {
                    required: true
                })}
                onChange={e => setValue('office', e.target.value)}
                hasError={!!errors.office}
                errorMessage={errors.office?.message}
            />
            <Input
                placeholder="Segmento de atuação"
                {...register("segment", {
                    required: true
                })}
                onChange={e => setValue('segment', e.target.value)}
                hasError={!!errors.segment}
                errorMessage={errors.segment?.message}
            />
            <Input
                type='number'
                placeholder="Número de funcionários"
                {...register("amountEmployee", {
                    required: true
                })}
                onChange={e => setValue('amountEmployee', Number(e.target.value))}
                hasError={!!errors.amountEmployee}
                errorMessage={errors.amountEmployee?.message}
            />


            <Button type='submit'>
                Enviar
            </Button>
        </Form>
    )
}