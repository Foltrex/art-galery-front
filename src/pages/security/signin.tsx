import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AuthService} from "../../services/AuthService";
import AlertNotification from '../../components/notifications/AlertNotification';
import {observer} from "mobx-react-lite";
import {Form, Formik} from 'formik';
import * as yup from "yup";
import {Button, Checkbox, FormControlLabel, Grid, TextField} from '@mui/material';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Art Galery
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignIn = observer(() => {

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = yup.object().shape({
        email: yup.string().required('Email cannot be empty').min(1).email("Email not valid"),
        password: yup.string().required('Password cannot be empty').min(1)
    })

    const login = (email: string, password: string) => {
        AuthService.login(email, password)
    }

    const SignInForm = () => {
        return (
            <Formik
                validateOnChange={false}
                validateOnBlur={true}
                initialValues={initialValues}
                onSubmit={(values) => login(values.email, values.password)}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form noValidate>
                        <AlertNotification/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            defaultValue={formik.values.email}
                            onChange={(event) => formik.setFieldValue('email', event.target.value)}
                            error={!!formik.errors.email} helperText={formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            defaultValue={formik.values.password}
                            onChange={(event) => formik.setFieldValue('password', event.target.value)}
                            error={!!formik.errors.password} helperText={formik.errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={"/security/signup"} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <SignInForm/>
                </Box>
                <Copyright sx={{mt: 4, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
})

export default SignIn