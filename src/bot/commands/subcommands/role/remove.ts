import { GuildMember, MessageEmbed } from 'discord.js';
import { SlashCommandSubCommandOptions } from '../../../../typings';

export default {
    name: 'remove',

    async execute(interaction, options) {
        const target = options.getMember('target') as GuildMember;
        const roles = options.getString('roles');

        const rolesRegex = /".*?"/g;

        if (!roles.match(rolesRegex)) {
            await interaction.reply({
                content: `**To add roles to a user you must use this format! -**
/role remove target: <target> roles: "role1" "role2" "111111111111"
**And so on!**
Note: It's also case sensitive, so if you try to remove a role named 'Role1' doing "role1" won't work.
And yes, you can use also use the roles' IDs`,
                ephemeral: true,
            });
            return;
        }

        const rolesToRemove = roles.match(rolesRegex);

        const removedRoles = [] as Array<string>;
        const ignoredRoles = [] as Array<string>;

        for (let roleToRemove of rolesToRemove) {
            roleToRemove = roleToRemove.replaceAll('"', '');
            // eslint-disable-next-line no-shadow
            const role = interaction.guild.roles.cache.find((role) => (role.name === roleToRemove) || role.id === roleToRemove);
            if (!role) continue;

            if (!target.roles.cache.has(role.id)) {
                ignoredRoles.push(`\`${role.name}\``);
                continue;
            }

            // Put this to try-catch block
            // just in case a user tries to remove a role
            // but the bot's role isn't high enough to do so.
            try {
                await target.roles.remove(role);
                removedRoles.push(`\`${role.name}\``);
            }
            catch { continue; }
        }

        const embed = new MessageEmbed()
            .setAuthor({
                name: target.user.tag,
                iconURL: target.user.displayAvatarURL({ dynamic: true }),
            })
            .addField('Role(s) removed', `${removedRoles.join(', ') || 'None'}`)
            .setColor('BLURPLE')
            .setTimestamp()
            .setFooter({
                text: `Role(s) removed by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        if (ignoredRoles.length) {
            embed.addField('Ignored role(s) since the member doesn\'t have this/these role(s)', ignoredRoles.join(', '));
        }

        await interaction.reply({
            embeds: [embed],
        });
    },
} as SlashCommandSubCommandOptions;