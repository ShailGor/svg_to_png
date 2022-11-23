import { Links, User } from '../schema/projectSchema';

export async function addEmail(email: any) {
    try {
        let data = await User.create({ email });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getEmail(email: any) {
    try {
        let data = await User.findOne({
            where: {
                email: email,
            },
            attributes: ['id'],
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function addLink(body: any) {
    try {
        let data = await Links.create(body);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function countLinks(user_id: any) {
    try {
        let count = await Links.count({
            where: {
                user_id: user_id,
            },
            attributes: ['user_id'],
        });
        return count;
    } catch (error) {
        throw error;
    }
}
