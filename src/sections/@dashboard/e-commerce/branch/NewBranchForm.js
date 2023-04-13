import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// @mui
import {
    Box,
    Grid,
    Card,
    Stack,
    MenuItem,
    Alert
} from '@mui/material';
import localAxios from 'axios';

import { LoadingButton } from '@mui/lab';
// _mock
import { state, country } from '../../../_mock';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getBranch, getState } from '../../../redux/slices/user';
import { useDispatch } from '../../../redux/store';

// ----------------------------------------------------------------------

export default function NewBranchForm() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const isMountedRef = useIsMountedRef();

    const { enqueueSnackbar } = useSnackbar();

    const UpdateBranchSchema = Yup.object().shape({
        branchName: Yup.string().required(),
        branchGstin: Yup.string().nullable().matches('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$', {
            message: 'GST No. is not valid',
            excludeEmptyString: true
        }),
        branchAddress_1: Yup.string(),
        branchAddress_2: Yup.string(),
        branchCity: Yup.string(),
    });

    const dispatch = useDispatch();

    const defaultValues = {
        branchName: '',
        branchGstin: '',
        branchAddress_1: '',
        branchAddress_2: '',
        branchPincode: '',
        branchState: '',
        branchCountry: 19,
        branchCity: '',
    };

    const methods = useForm({
        resolver: yupResolver(UpdateBranchSchema),
        defaultValues
    });

    // const validateGstIn = (gst, state) => {
    //     let validateGst = 0;
    //     if (gst !== '' && state !== '') {
    //         let stateCode = getState(state);
    //         stateCode = stateCode.slice(0, 2);
    //         const gstCode = gst.slice(0, 2);
    //         if (gstCode === stateCode) {
    //             validateGst = 1;
    //         }
    //     }
    //     return validateGst;
    // };

    const {
        reset,
        setError,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (data) => {
        try {   
            const { branchPincode, branchCountry, branchState } = data;

            // if (branchGstIn !== '' && branchState !== '' && branchCountry === 19) {
            //     const validGst = validateGstIn(branchGstIn, branchState);
            //     if (validGst !== 1) {
            //         setErrorMessage('Gst no. is not valid for this state');
            //         throw new Error('Gst no. is not valid for this state');
            //     }
            // }
            
            if (branchState !== '' && branchPincode !== '' && branchCountry === 19) {
                await localAxios.get(`https://api.postalpincode.in/pincode/${branchPincode}`).then((response) => {
                    if (response.data[0].PostOffice === null) {
                        setErrorMessage('Pincode not exists in our database.');
                        throw new Error('Pincode not exists in our database.');
                    }
                    const stateFromApi = response.data[0].PostOffice[0].State;
                    let stateName = getState(branchState);
                    stateName = stateName.slice(3, 28);
                    if (stateName === stateFromApi) {
                        axios.post('/branch', data).then(()=>{
                            enqueueSnackbar('Create success!');
                            dispatch(getBranch());
                            navigate(PATH_DASHBOARD.branches.branch);
                        })
                    } 
                    else {
                        setErrorMessage('Pincode and state name mismatch');
                        throw new Error('Pincode and state name mismatch');
                    }
                });
            }
            else{
                await axios.post('/branch', data);
                enqueueSnackbar('Create success!');
                dispatch(getBranch());
                navigate(PATH_DASHBOARD.branches.branch);
    
            }
        } catch (error) {
            if (isMountedRef.current) {
                setError('afterSubmit', error);
            }
            reset(
                {},
                {
                  keepValues: true
                }
              );
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message || errorMessage}</Alert>}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                            }}
                        >
                            <RHFTextField name="branchName" label="Branch Name" />

                            <RHFTextField name="branchGstin" label="GSTIN" />

                            <RHFTextField name="branchAddress_1" label="Address 1" />

                            <RHFTextField name="branchAddress_2" label="Address 2" />

                            <RHFTextField name="branchPincode" label="Branch Pincode" type="Number" />

                            <RHFTextField name="branchCity" label="Branch City" />

                            <RHFSelect name="branchState" label="Branch State" >
                                <MenuItem value="" />
                                {state.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>


                            <RHFSelect name="branchCountry" label="Branch Country" >
                                {country.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Box>

                        <Stack alignItems="flex-end">
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Create Branch
                            </LoadingButton>
                        </Stack>

                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
