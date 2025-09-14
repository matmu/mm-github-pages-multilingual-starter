# _plugins/locale_from_active_lang.rb
# Sets site.locale (for UI text lookups) and site.og_locale (for Open Graph)
# per Polyglot language run. Uses _data/lang.yml (locale) and checks which
# keys exist in _data/ui-text.yml so UI lookups keep working out of the box.

Jekyll::Hooks.register :site, :pre_render do |site|
  # 1) Determine the short language code (e.g., "de", "en")
  active  = site.config['active_lang']
  default = site.config['default_lang'] || site.config['locale'] || 'en'
  short   = (active && !active.to_s.empty?) ? active.to_s : default.to_s

  # 2) Resolve full locale from _data/lang.yml (e.g., "de_DE"); fallback: short
  data_lang     = site.data['lang'] || {}
  full_from_yml = nil
  if data_lang[short].is_a?(Hash) && data_lang[short]['locale']
    full_from_yml = data_lang[short]['locale'].to_s # e.g., "de_DE"
  end

  # 3) Normalize formats for OG and hyphenated variants
  full_og     = (full_from_yml || short).tr('-', '_') # "de_DE"; "en" stays "en"
  full_hyphen = full_og.tr('_', '-')                  # "de-DE"; "en" stays "en"

  # 4) Choose the best UI key for ui-text.yml:
  #    Prefer "de-DE" if present; otherwise use "de"
  ui = site.data['ui-text'] || {}
  locale_for_ui =
    if ui.is_a?(Hash) && ui.key?(full_hyphen)
      full_hyphen
    elsif ui.is_a?(Hash) && ui.key?(short)
      short
    else
      short # fallback: short language code
    end

  # 5) Expose to templates
  site.config['locale']    = locale_for_ui  # used by site.data['ui-text'][site.locale]
  site.config['og_locale'] = full_og        # used by <meta property="og:locale">

  #Jekyll.logger.info "locale-plugin", "active=#{short} ui=#{site.config['locale']} og=#{site.config['og_locale']}"
end
