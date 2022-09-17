import { FC, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import 'react-toastify/dist/ReactToastify.css';

import { routes } from 'routes'

import { Preload } from 'components/common/Preload/Preload'
import { Header } from 'components/business/Header/Header'
import { Categories } from 'components/business/Categories/Categories'
import { ErrorFallback } from 'components/common/ErrorFallback/ErrorFallback.lazy'

import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from 'hooks/useRedux'
import { auth } from './firebase'
import { addUser } from 'store/slices/authSlice/authSlice'

export const Home: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(addUser(currentUser))
            } else {
                localStorage.removeItem('user')
            }
        })

        return unsubscribe
    }, [dispatch])

    return (
        <ErrorBoundary fallbackRender={() => <ErrorFallback height='100vh' />}>
            <Header />
            <Categories />

            <Suspense fallback={<Preload />}>
                <Routes>
                    {routes.map(route =>
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    )}
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}