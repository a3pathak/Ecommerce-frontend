// import { capitalCase } from 'change-case';
// import { Link as RouterLink } from 'react-router-dom';
// // @mui
// import { styled } from '@mui/material/styles';
// import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
// // hooks
// import useAuth from '../../hooks/useAuth';
// import useResponsive from '../../hooks/useResponsive';
// // routes
// import { PATH_AUTH } from '../../routes/paths';
// // components
// import Page from '../../components/Page';
// import Logo from '../../components/Logo';
// import Image from '../../components/Image';
// // sections
// import { RegisterForm } from '../../sections/auth/register';

// // ----------------------------------------------------------------------

// const RootStyle = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const HeaderStyle = styled('header')(({ theme }) => ({
//   top: 0,
//   zIndex: 9,
//   lineHeight: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'absolute',
//   padding: theme.spacing(3),
//   justifyContent: 'space-between',
//   [theme.breakpoints.up('md')]: {
//     alignItems: 'flex-start',
//     padding: theme.spacing(7, 5, 0, 7),
//   },
// }));

// const SectionStyle = styled(Card)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 464,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: theme.spacing(2, 0, 2, 2),
// }));

// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   display: 'flex',
//   minHeight: '100vh',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   padding: theme.spacing(12, 0),
// }));

// // ----------------------------------------------------------------------

// export default function Register() {
//   const { method } = useAuth();

//   const smUp = useResponsive('up', 'sm');
//   const mdUp = useResponsive('up', 'md');

//   return (
//     <Page title="Register">
//       <RootStyle>
//         <HeaderStyle>
//           <Logo />
//           {smUp && (
//             <Typography variant="body2" sx={{ mt: { md: -2 } }}>
//               Already have an account?{' '}
//               <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
//                 Login
//               </Link>
//             </Typography>
//           )}
//         </HeaderStyle>

//         {mdUp && (
//           <SectionStyle>
//             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//               Manage the job more effectively with Minimal
//             </Typography>
//             <Image
//               alt="register"
//               src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_register.png"
//             />
//           </SectionStyle>
//         )}

//         <Container>
//           <ContentStyle>
//             <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
//               <Box sx={{ flexGrow: 1 }}>
//                 <Typography variant="h4" gutterBottom>
//                   Get started absolutely free.
//                 </Typography>
//                 <Typography sx={{ color: 'text.secondary' }}>Free forever. No credit card needed.</Typography>
//               </Box>
//               <Tooltip title={capitalCase(method)}>
//                 <>
//                   <Image
//                     disabledEffect
//                     src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
//                     sx={{ width: 32, height: 32 }}
//                   />
//                 </>
//               </Tooltip>
//             </Box>

//             <RegisterForm />

//             <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
//               By registering, I agree to Minimal&nbsp;
//               <Link underline="always" color="text.primary" href="#">
//                 Terms of Service
//               </Link>
//               and
//               <Link underline="always" color="text.primary" href="#">
//                 Privacy Policy
//               </Link>
//               .
//             </Typography>

//             {!smUp && (
//               <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
//                 Already have an account?{' '}
//                 <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
//                   Login
//                 </Link>
//               </Typography>
//             )}
//           </ContentStyle>
//         </Container>
//       </RootStyle>
//     </Page>
//   );
// }


import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack, Card, Typography, Box, Divider, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { PATH_DASHBOARD, PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------
export default function Signin() {

  const navigate = useNavigate();

  const style = {
    layout: {
      width: '100%',
      height: '100vh',
      background: '#a29bfe',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formLayout: {
      width: '25%',
      margin: 5
    },
    button: {
      background: '#e84393',
      color: 'white',
      mt:3,
      width: '100%'
    }
  }

  const UpdateSigninSchema = Yup.object().shape({
    email: Yup.string().email().required("This is a required field"),
    mobile: Yup.string().required("This is a required field"),
    password: Yup.string().required("This is a required field")
  });

  const defaultValues = {
    email: '',
    mobile: '',
    password: ''
  };

  const methods = useForm({
    resolver: yupResolver(UpdateSigninSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      navigate(PATH_DASHBOARD.form.root);
    } catch (error) {
      reset();
    }
  };

  return (
    <Box sx={style.layout}>
      <Card sx={style.formLayout} spacing={5}>
        <Box sx={{ m: 5 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Typography variant='h6'>SIGN IN</Typography>

            <Box
              sx={{
                display: 'grid',
                rowGap: 2,
                mt: 2,
                gridTemplateColumns: { xs: 'repeat(1,1fr)', sm: 'repeat(1, 1fr)' }
              }}
            >
              <RHFTextField name="userName" label="User Name" size="small"/>
              <RHFTextField name="email" label="Email address" size="small"/>
              <RHFTextField name="mobile" label="Mobile number" size="small" type='number'/>
              <RHFTextField name="password" label="Password" size="small" type='password'/>
            </Box>

            <LoadingButton type="submit" sx={style.button} loading={isSubmitting}>
              SIGN IN
            </LoadingButton>
            
            <Divider sx={{mt: 2}}>
              <Typography sx={{ border: '1px solid grey', borderRadius: 1, padding: 'none', p: '3px'}}>OR</Typography>
            </Divider>
            
            <Stack alignItems="center" sx={{mt: 3}}>
              <Typography>Already a user? <Link component={RouterLink} to={PATH_AUTH.login}>LOGIN</Link></Typography>
            </Stack>
        
          </FormProvider>
        </Box>
      </Card>
    </Box>
  );
}
