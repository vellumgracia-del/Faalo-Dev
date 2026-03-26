export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-26'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

// We set a default dummy project ID so it won't crash the development server immediately.
// You MUST replace 'YOUR_PROJECT_ID_HERE' with your real project ID from Sanity Manage.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'djy9z2a7';

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
