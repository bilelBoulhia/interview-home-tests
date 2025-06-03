import { renderHook, act } from '@testing-library/react'
import { useCookie } from '@/app/_hooks/useCookie'
import Cookies from 'js-cookie'

jest.mock('js-cookie')

describe('useCookie', () => {
    it('devrait définir un cookie', () => {
        const { result } = renderHook(() => useCookie())

        act(() => {
            result.current.setCookie('clé', 'valeur')
        })

        expect(Cookies.set).toHaveBeenCalledWith('clé', 'valeur', { expires: 7, path: '/' })
        expect(result.current.value).toBe('valeur')
    })

    it('devrait récupérer un cookie', () => {
        Cookies.get.mockReturnValue('valeur')

        const { result } = renderHook(() => useCookie())

        let valeur
        act(() => {
            valeur = result.current.getCookie('clé')
        })

        expect(Cookies.get).toHaveBeenCalledWith('clé')
        expect(valeur).toBe('valeur')
        expect(result.current.value).toBe('valeur')
    })

    it('devrait supprimer un cookie', () => {
        const { result } = renderHook(() => useCookie())

        act(() => {
            result.current.removeCookie('clé')
        })

        expect(Cookies.remove).toHaveBeenCalledWith('clé', { path: '/' })
        expect(result.current.value).toBe(null)
    })
})
