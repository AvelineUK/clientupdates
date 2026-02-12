export const TIER_LIMITS = {
  beta: {
    maxProjects: null, // unlimited
    hasCustomBranding: true,
    hasFileAttachments: true,
  },
  free: {
    maxProjects: 3,
    hasCustomBranding: false,
    hasFileAttachments: false,
  },
  pro: {
    maxProjects: null, // unlimited
    hasCustomBranding: true,
    hasFileAttachments: true,
  },
}

export function canCreateProject(tier: string, currentProjectCount: number): boolean {
  const limits = TIER_LIMITS[tier as keyof typeof TIER_LIMITS]
  if (!limits) return false
  
  if (limits.maxProjects === null) return true // unlimited
  return currentProjectCount < limits.maxProjects
}

export function getProjectLimit(tier: string): number | null {
  const limits = TIER_LIMITS[tier as keyof typeof TIER_LIMITS]
  return limits?.maxProjects ?? null
}

export function canUploadFiles(tier: string): boolean {
  const limits = TIER_LIMITS[tier as keyof typeof TIER_LIMITS]
  return limits?.hasFileAttachments ?? false
}

export function canCustomBrand(tier: string): boolean {
  const limits = TIER_LIMITS[tier as keyof typeof TIER_LIMITS]
  return limits?.hasCustomBranding ?? false
}