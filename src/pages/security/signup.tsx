import {
    Avatar,
    Button,
    Checkbox,
    CssBaseline,
    Divider,
    FormControlLabel,
    Grid,
    ListItem,
    List,
    Stack,
    TextField,
    Typography,
    ListItemText
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import React, {useState} from 'react';
import {AccountEnum} from "../../entities/enums/AccountEnum";

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

const SignUp = () => {

    const [accountType, setAccountType] = useState(AccountEnum.ARTIST)

    const options = [
        {label: "Artist", value: AccountEnum.ARTIST},
        {label: "Organization", value: AccountEnum.REPRESENTATIVE},
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    // @ts-ignore
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
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
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={2}>
                                    {
                                        options.map((option, index) => (
                                            <FormControlLabel key={index}
                                                              control={<Checkbox/>}
                                                              label={option.label}
                                                              value={option.value}
                                                              checked={accountType == option.value}
                                                              onChange={() => setAccountType(option.value)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <Divider style={{width:'100%'}} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/security/signin">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 4}}/>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;