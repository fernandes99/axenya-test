import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, CheckBox, Form, InputBox, InputsBox, SelectBox, SelectFormPartner } from "../../../pages/parcerias/[slug]/index.styles";
import { GSheetService } from "../../../services/gsheet";
import { MailchimpService } from "../../../services/mailchimp/sendLead";
import { Text } from "../../../styles/text";
import theme from "../../../styles/theme";
import { Input } from "../../input";
import { sendSalesForce } from "../../../services/salesforce";

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

interface IHubsFormProps {
    onSuccess: () => void,
    onError: () => void,
    setLoading: (isLoading: boolean) => void,  
    partner: {
        name: string,
        slug: string
    }
}

export const HubsForm = ({ onSuccess, onError, setLoading, partner }: IHubsFormProps) => {
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
    
    const onSubmit = handleSubmit(async data => {
        setLoading(true);

        try {
            await MailchimpService.sendLead({
                email_address: data.email,
                tags: [`form-partner-${partner.slug}`],
                status: 'subscribed',
                merge_fields: {
                    FNAME: data.name,
                    PHONE: data.phone,
                    COMPANY: partner.slug,
                    COMMENT: '',
                    SECTOR: '',
                }
            });

            await GSheetService.sendLeadPartnerForm({
                cnpj: data.cnpj,
                name: data.name,
                phone: data.phone,
                email: data.email,
                office: data.office,
                coverage: data.coverage,
                contract: data.contract,
                accommodation: data.accommodation,
                category: data.category,
                coparticipation: data.coparticipation,
                '0-18': data['0-18'] || 0,
                '19-23': data['19-23'] || 0,
                '24-28': data['24-28'] || 0,
                '29-33': data['29-33'] || 0,
                '34-38': data['34-38'] || 0,
                '39-43': data['39-43'] || 0,
                '44-48': data['44-48'] || 0,
                '49-53': data['49-53'] || 0,
                '54-58': data['54-58'] || 0,
                '59+': data['59+'] || 0,
                partner: partner.name,
            });

            await sendSalesForce({
                name: data.name,
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

    const handleCategoryCheckbox = (value: 'Básico' | 'Intermedário' | 'Executivo' | 'Premium', isChecked: boolean) => {
        if (isChecked) {
            return setValue("category", [...watch("category"), value]);
        }
        
        setValue("category", watch("category")?.filter(i => i !== value));
    }

    return (
        <Form onSubmit={onSubmit}>
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
            <SelectBox>
                <label>
                    Abrangência de cobertura
                </label>
                <SelectFormPartner {...register("coverage")} hasError={!!errors.coverage}>
                    <option value='Cobertura Nacional'>
                        Cobertura Nacional
                    </option>
                    <option value='Cobertura Regional'>
                        Cobertura Regional
                    </option>
                </SelectFormPartner>
            </SelectBox>
            <SelectBox>
                <label>
                    Modelo de contrato
                </label>
                <SelectFormPartner {...register("contract")} hasError={!!errors.contract}>
                    <option value='Compulsório'>
                        Compulsório (obrigação de entrada de 100% dos funcionários registrados no FGTS)
                    </option>
                    <option value='Adesão'>
                        Adesão (entrada optativa)
                    </option>
                </SelectFormPartner>
            </SelectBox>
            <SelectBox>
                <label>
                    Acomodação
                </label>
                <SelectFormPartner {...register("accommodation")} hasError={!!errors.accommodation}>
                    <option value='Apartamento'>
                        Apartamento
                    </option>
                    <option value='Enfermaria'>
                        Enfermaria
                    </option>
                </SelectFormPartner>
            </SelectBox>
            <SelectBox>
                <label>
                    Coparticipação
                </label>
                <SelectFormPartner {...register("coparticipation")} hasError={!!errors.coparticipation}>
                    <option value='Sim'>
                        Sim
                    </option>
                    <option value='Não'>
                        Não
                    </option>
                    <option value='Ambos'>
                        Ambos
                    </option>
                </SelectFormPartner>
            </SelectBox>
            <div>
                <Text as="p" category="s2" weight="bold" color={!!errors.category ? '#ff6161' : theme.colors.white}>
                    Categoria:
                </Text>
                <CheckBox>
                    <label htmlFor="category1">
                        <b>Básico</b> (cobertura regional, sem reembolso, produtos de entrada)
                    </label>
                    <Input
                        type="checkbox"
                        id="category1"
                        onChange={(event: any) => handleCategoryCheckbox("Básico", event.target.checked)}
                        value="Básico"
                    />
                </CheckBox>
                <CheckBox>
                    <label htmlFor="category2">
                        <b>Intermedário</b> (cobertura nacional, reembolsos, rede credenciada mais agrangente)
                    </label>
                    <Input
                        type="checkbox"
                        id="category2"
                        onChange={(event: any) => handleCategoryCheckbox("Intermedário", event.target.checked)}
                        value="Intermedário"
                    />
                </CheckBox>
                <CheckBox>
                    <label htmlFor="category3">
                        <b>Executivo</b> (cobertura nacional, rede credenciada de melhores hospitais, laboratórios e clínicas)
                    </label>
                    <Input
                        type="checkbox"
                        id="category3"
                        onChange={(event: any) => handleCategoryCheckbox("Executivo", event.target.checked)}
                        value="Executivo"
                    />
                </CheckBox>
                <CheckBox>
                    <label htmlFor="category4">
                        <b>Premium</b> (mesma rede credenciada do plano Executivo, com maior nível de reembolso e mais serviços )
                    </label>
                    <Input
                        type="checkbox"
                        id="category4"
                        onChange={(event: any) => handleCategoryCheckbox("Premium", event.target.checked)}
                        value="Premium"
                    />
                </CheckBox>
            </div>
            <div>
                <Text as="p" category="s2" weight="bold" color={!!errors.category ? '#ff6161' : theme.colors.white}>
                    Por favor preencha com a quantidade de vidas (titulares + dependentes) em cada faixa etária:
                </Text>
                <InputsBox>
                    {oldGroup.map((old: any, index) => (
                        <InputBox key={index}>
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
                        </InputBox>
                    ))}
                </InputsBox>
            </div>

            <Button type='submit'>
                Enviar
            </Button>
        </Form>
    )
}