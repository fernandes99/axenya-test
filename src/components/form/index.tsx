import { useEffect, useMemo, useState } from "react";
import { S } from "./styles";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Text } from "../../styles/text";
import theme from "../../styles/theme";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { showToast } from "../../helpers/toast";
import { MailchimpService } from "../../services/mailchimp/sendLead";
import { sendSalesForce } from "../../services/salesforce";

type ISizeCompanySlug = 'PMEI' | 'PMEII' | 'PJ';

const initialForm = {
    cnpj: '',
    name: '',
    email: '',
    phone: '',
    office: '',
    coverage: '',
    contract: '',
    accommodation: '',
    coparticipation: '',
    category: []
} as PartnerFormType;

interface PartnerFormType {
    cnpj: string,
    name: string,
    email: string,
    phone: string,
    office: string,
    coverage: 'Cobertura Nacional' | 'Cobertura Regional' | '',
    contract: 'Compulsório' | 'Adesão' | '',
    accommodation: 'Apartamento' | 'Enfermaria' | '',
    coparticipation: 'Sim' | 'Não' | 'Ambos' | '',
    category: string[],
    '0-18'?: number,
    '19-23'?: number,
    '24-28'?: number,
    '29-33'?: number,
    '34-38'?: number,
    '39-43'?: number,
    '44-48'?: number,
    '49-53'?: number,
    '54-58'?: number,
    '59+'?: number
}

const oldGroup =
    ['0-18', '19-23', '24-28', '29-33', '34-38', '39-43', '44-48', '49-53', '54-58', '59+'];

interface FormBlockProps {
    companySize: ISizeCompanySlug,
}

export const FormBlock = ({ companySize }: FormBlockProps) => {
    const [loadingForm, setLoadingForm] = useState(false);
    const [sendedForm, setSendedForm] = useState(false);
    const snippetTitle = useMemo(() => {
        if (companySize === 'PJ') return 'com +100 vidas';
        if (companySize === 'PMEII') return 'entre 30 e 99 vidas';
        return 'entre 02 e 29 vidas';
    }, [companySize]);
    
    return (
        <>
            {loadingForm && <S.LoadingForm />}
            {sendedForm ?
                <S.FeedbackForm>
                    <AiOutlineCheckCircle size={36} />
                    <Text
                        as="p"
                        category="m1"
                        color={theme.colors.white}
                    >
                        Informações enviadas com sucesso! Entraremos em contato em breve
                    </Text>
                </S.FeedbackForm>
                :
                <>
                    <Text
                        as='p'
                        category='s1'
                        mb='16px'
                        color={theme.colors.white}
                    >
                        Formulário para empresas <strong>{snippetTitle}</strong>
                    </Text>
                    <ContentForm
                        onError={() => showToast("error", "Houve um problema ao enviar suas informações, tente novamente mais tarde.")}
                        onSuccess={() => {
                            showToast("success", "Suas informações foram enviadas com sucesso!");
                            setSendedForm(true);
                        }}
                        setLoading={setLoadingForm}
                        companySize={companySize}
                    />
                </>
            }
        </>
    )
}

interface ContentFormProps {
    onSuccess: () => void,
    onError: () => void,
    setLoading: (isLoading: boolean) => void,  
    companySize: string
}

const ContentForm = ({ onSuccess, onError, setLoading, companySize }: ContentFormProps) => {
    const {
        watch,
        setValue,
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm({
        defaultValues: initialForm
    });

    const handleCategoryCheckbox = (value: 'Básico' | 'Intermedário' | 'Executivo' | 'Premium', isChecked: boolean) => {
        if (isChecked) {
            return setValue("category", [...watch("category"), value]);
        }
        
        setValue("category", watch("category")?.filter(i => i !== value));
    }

    const onSubmit = handleSubmit(async data => {
        setLoading(true);

        try {
            await MailchimpService.sendLead({
                email_address: data.email,
                tags: [`form-quotation-${companySize}`],
                status: 'subscribed',
                merge_fields: {
                    FNAME: data.name,
                    PHONE: data.phone,
                    COMPANY: data.cnpj,
                    COMMENT: '',
                    SECTOR: '',
                }
            });

            await sendSalesForce({
                name: data.name,
                email: data.email,
                company: data.cnpj,
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

    useEffect(() => {
        register('cnpj', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('name', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('email', {
            required: { value: true, message: 'Este campo é obrigatório.' },
            pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Formato de e-mail inválido.',
            },
        });
        register('phone', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('office', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('coverage', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('contract', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('accommodation', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('coparticipation', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('category', { required: { value: true, message: 'Este campo é obrigatório.' }});
        register('0-18');
        register('19-23');
        register('24-28');
        register('29-33');
        register('34-38');
        register('39-43');
        register('44-48');
        register('49-53');
        register('54-58');
        register('59+');
    }, [register]);

    return (
        <S.Form onSubmit={onSubmit}>
            <Input
                placeholder="CNPJ"
                name="cnpj"
                value={watch('cnpj')}
                hasError={!!errors.cnpj}
                errorMessage={errors.cnpj?.message}
                onChange={e => setValue('cnpj', e.target.value)}
            />
            <Input
                placeholder="Nome de contato"
                name="name"
                value={watch('name')}
                hasError={!!errors.name}
                errorMessage={errors.name?.message}
                onChange={e => setValue('name', e.target.value)}
            />
            <Input
                placeholder="Telefone de contato"
                name="phone"
                value={watch('phone')}
                hasError={!!errors.phone}
                errorMessage={errors.phone?.message}
                onChange={e => setValue('phone', e.target.value)}
            />
            <Input
                placeholder="Email de contato"
                name="email"
                value={watch('email')}
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
                onChange={e => setValue('email', e.target.value)}
            />
            <Input
                placeholder="Cargo"
                name="office"
                value={watch('office')}
                hasError={!!errors.office}
                errorMessage={errors.office?.message}
                onChange={e => setValue('office', e.target.value)}
            />

            <S.SelectBox>
                <label>
                    Abrangência de cobertura
                </label>
                <S.OptionBox {...register("coverage")} hasError={!!errors.coverage}>
                    <option value='Cobertura Nacional'>
                        Cobertura Nacional
                    </option>
                    <option value='Cobertura Regional'>
                        Cobertura Regional
                    </option>
                </S.OptionBox>
            </S.SelectBox>
            <S.SelectBox>
                <label>
                    Modelo de contrato
                </label>
                <S.OptionBox {...register("contract")} hasError={!!errors.contract}>
                    <option value='Compulsório'>
                        Compulsório (obrigação de entrada de 100% dos funcionários registrados no FGTS)
                    </option>
                    <option value='Adesão'>
                        Adesão (entrada optativa)
                    </option>
                </S.OptionBox>
            </S.SelectBox>
            <S.SelectBox>
                <label>
                    Acomodação
                </label>
                <S.OptionBox {...register("accommodation")} hasError={!!errors.accommodation}>
                    <option value='Apartamento'>
                        Apartamento
                    </option>
                    <option value='Enfermaria'>
                        Enfermaria
                    </option>
                </S.OptionBox>
            </S.SelectBox>
            <S.SelectBox>
                <label>
                    Coparticipação
                </label>
                <S.OptionBox {...register("coparticipation")} hasError={!!errors.coparticipation}>
                    <option value='Sim'>
                        Sim
                    </option>
                    <option value='Não'>
                        Não
                    </option>
                    <option value='Ambos'>
                        Ambos
                    </option>
                </S.OptionBox>
            </S.SelectBox>
            <div>
                <Text as="p" category="s2" weight="bold" color={!!errors.category ? '#ff6161' : theme.colors.white}>
                    Categoria:
                </Text>
                <S.CheckBox>
                    <label htmlFor="category1">
                        <b>Básico</b> (cobertura regional, sem reembolso, produtos de entrada)
                    </label>
                    <Input
                        type="checkbox"
                        id="category1"
                        onChange={(event: any) => handleCategoryCheckbox("Básico", event.target.checked)}
                        value="Básico"
                    />
                </S.CheckBox>
                <S.CheckBox>
                    <label htmlFor="category2">
                        <b>Intermedário</b> (cobertura nacional, reembolsos, rede credenciada mais agrangente)
                    </label>
                    <Input
                        type="checkbox"
                        id="category2"
                        onChange={(event: any) => handleCategoryCheckbox("Intermedário", event.target.checked)}
                        value="Intermedário"
                    />
                </S.CheckBox>
                <S.CheckBox>
                    <label htmlFor="category3">
                        <b>Executivo</b> (cobertura nacional, rede credenciada de melhores hospitais, laboratórios e clínicas)
                    </label>
                    <Input
                        type="checkbox"
                        id="category3"
                        onChange={(event: any) => handleCategoryCheckbox("Executivo", event.target.checked)}
                        value="Executivo"
                    />
                </S.CheckBox>
                <S.CheckBox>
                    <label htmlFor="category4">
                        <b>Premium</b> (mesma rede credenciada do plano Executivo, com maior nível de reembolso e mais serviços )
                    </label>
                    <Input
                        type="checkbox"
                        id="category4"
                        onChange={(event: any) => handleCategoryCheckbox("Premium", event.target.checked)}
                        value="Premium"
                    />
                </S.CheckBox>
            </div>
            <div>
                <Text as="p" category="s2" weight="bold" color={!!errors.category ? '#ff6161' : theme.colors.white}>
                    Por favor preencha com a quantidade de vidas (titulares + dependentes) em cada faixa etária:
                </Text>
                <S.OldInputList>
                    {oldGroup.map((old: any, index) => (
                        <S.OldInputItem key={index}>
                            <Text as="p" category="s1" color={theme.colors.white} align="right">
                                {old}
                            </Text>
                            <Input
                                placeholder="Quantia"
                                name={old}
                                value={watch(old)}
                                onChange={(e: any) => setValue(old, e.target.value)}
                                type="number"
                                style={{ width: '100%', padding: '8px 8px 8px 16px' }}
                            />
                        </S.OldInputItem>
                    ))}
                </S.OldInputList>
            </div>

            <S.FormButton type='submit'>
                Enviar
            </S.FormButton>
        </S.Form>
    )
}