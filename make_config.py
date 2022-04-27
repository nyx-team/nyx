from os.path import exists

config_path = './config.json'

template = '''{
    "token": "TOKEN HERE"
}
'''

def generate_config():
    if exists(config_path):
        should_overwrite = input(f'A config file in \'src/config.json\' already exist!\nOverwrite the file? [y/N] ')

        if (should_overwrite.strip() == "" 
            or should_overwrite[0] == 'n' 
            or should_overwrite[0] != 'y'):
                print('\nOperation cancelled.')
                return
        elif should_overwrite[0].lower() == 'y':
            print('Overwriting file...')

    print('Generating Config...')

    with open(config_path, "w") as f:
        f.write(template)
        print('Done!')

def main():
    generate_config()

if __name__ == '__main__':
    main()
