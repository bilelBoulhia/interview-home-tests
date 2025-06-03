import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '@/app/actions'

global.fetch = jest.fn()
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }))
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))

describe('productActions', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('getProducts - succès', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, name: 'Produit' }]
        })

        const result = await getProducts()
        expect(result).toEqual([{ id: 1, name: 'Produit' }])
    })

    it('getProducts - erreur', async () => {
        fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) })

        const result = await getProducts()
        expect(result).toEqual({})
    })

    it('createProduct - succès', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: 'Produit' })
        })

        const result = await createProduct({ name: 'Test' })
        expect(result.success).toBe(true)
    })

    it('updateProduct - succès', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: 'Modifié' })
        })

        const result = await updateProduct(1, { name: 'Modifié' })
        expect(result.success).toBe(true)
    })

    it('deleteProduct - succès', async () => {
        fetch.mockResolvedValueOnce({ ok: true })

        const result = await deleteProduct(1)
        expect(result.success).toBe(true)
    })
})
