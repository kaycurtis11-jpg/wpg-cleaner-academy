type Video = {
  title: string
  embedId: string
  source?: 'youtube' | 'drive'
}

type Category = {
  label: string
  icon: string
  videos: Video[]
}

const CATEGORIES: Category[] = [
  {
    label: 'Bathroom',
    icon: '🚿',
    videos: [
      { title: 'Bathroom Cleaning', embedId: 'GVeHi7TSEgI' },
      { title: 'Glass Shower Doors', embedId: 'VTOs3exVxHc' },
      { title: 'Tubs & Showers', embedId: 'ExEDcKK8u4E' },
    ],
  },
  {
    label: 'Kitchen',
    icon: '🍳',
    videos: [
      { title: 'Kitchen Cleaning', embedId: '3Vryfeo7rrE' },
      { title: 'Refrigerator', embedId: 'Yj3VZVCrFkU' },
      { title: 'Oven', embedId: 'kEwvNgWIZAU' },
      { title: 'Glass Stove', embedId: 'aV3_Cmf6kMk' },
      { title: 'Gas Stove', embedId: 'U5GdB42-rdM' },
    ],
  },
  {
    label: 'Floors & Windows',
    icon: '🪟',
    videos: [
      { title: 'Floor Cleaning', embedId: 'did-T8pkKK4' },
      { title: 'Mopping Techniques', embedId: 'TXt-XwHywOY' },
      { title: 'Vacuuming', embedId: 'vk4SlLFuRwM' },
      { title: 'Windows Without Streaks', embedId: 'ZyRnWSx1VTg' },
    ],
  },
  {
    label: 'General & Deep Clean',
    icon: '🧹',
    videos: [
      { title: 'Cleaning 101', embedId: '0rNMpFcebcc' },
      { title: 'Deep Clean', embedId: 'JflYB9gHCek' },
      { title: 'Move In / Move Out', embedId: 'XJSeBnIf_pk' },
    ],
  },
  {
    label: 'Commercial',
    icon: '🏢',
    videos: [
      { title: 'Office Cleaning', embedId: '4t2U-TKDmUg' },
      { title: 'Commercial Washroom', embedId: 's03XgZi3VBo' },
    ],
  },
  {
    label: 'Supplies & Products',
    icon: '🧴',
    videos: [
      { title: 'Floor Cleaner Mixing Guide', embedId: '11CZgWFRVRlCZZNY_GFT1k94tQDBKmTlw', source: 'drive' },
      { title: 'Residential Supplies Overview', embedId: '1J3EEkJq0lLPj9PJDyeF2M5ajIwZHUGMV', source: 'drive' },
      { title: 'Commercial Supplies Overview', embedId: '1AKxKItgXXBWkfqec2rrNQnwymOb9_iWu', source: 'drive' },
    ],
  },
]

function embedUrl(video: Video) {
  return video.source === 'drive'
    ? `https://drive.google.com/file/d/${video.embedId}/preview`
    : `https://www.youtube.com/embed/${video.embedId}`
}

export default function HowToPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">How-To Videos</h1>
        <p className="text-gray-500 text-sm mt-1">Quick reference videos by room type. Use these on the job when you need a technique refresher.</p>
      </div>

      {CATEGORIES.map(cat => (
        <section key={cat.label}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{cat.icon}</span>
            <h2 className="text-lg font-semibold text-gray-900">{cat.label}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cat.videos.map(video => (
              <div key={video.embedId} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <iframe
                    src={embedUrl(video)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="px-4 py-3 text-sm font-medium text-gray-800">{video.title}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
