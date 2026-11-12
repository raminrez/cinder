import subprocess

files = subprocess.check_output(['git', 'ls-files']).decode('utf-8').splitlines()

replaced_files = 0
total_var_replacements = 0

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        continue

    new_content = content
    # Replace CSS variables
    if '--cinder-' in new_content:
        count = new_content.count('--cinder-')
        total_var_replacements += count
        new_content = new_content.replace('--cinder-', '--hashti-')
    
    # Replace data attributes
    if 'data-cinder-' in new_content:
        new_content = new_content.replace('data-cinder-', 'data-hashti-')
    if 'data-cinder=' in new_content:
        new_content = new_content.replace('data-cinder=', 'data-hashti=')

    # Replace class prefixes
    if '.cinder-' in new_content:
        new_content = new_content.replace('.cinder-', '.hashti-')
    if '"cinder-' in new_content:
        new_content = new_content.replace('"cinder-', '"hashti-')
    if "'cinder-" in new_content:
        new_content = new_content.replace("'cinder-", "'hashti-")
    if "`cinder-" in new_content:
        new_content = new_content.replace("`cinder-", "`hashti-")
    if ' cinder-' in new_content:
        new_content = new_content.replace(' cinder-', ' hashti-')

    # Replace @layer cinder
    if '@layer cinder' in new_content:
        new_content = new_content.replace('@layer cinder', '@layer hashti')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        replaced_files += 1

print(f"Done! Replaced across {replaced_files} files with {total_var_replacements} --cinder- variable replacements.")
