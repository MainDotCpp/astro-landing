#!/bin/bash
sed -i '' 's|<div class="w-10 h-10 bg-slate-900 flex items-center justify-center text-white font-serif font-bold text-xl">|<Image src={logoImg} alt="SG Wealth Forum Logo" class="w-10 h-10 object-contain rounded-md" />|' src/pages/SG/通版/index.astro
sed -i '' 's|          SG||' src/pages/SG/通版/index.astro
sed -i '' 's|        </div>||' src/pages/SG/通版/index.astro
