import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthController {
    //REGISTRO
    static async register(req: Request, res: Response) {

        const userRepository = AppDataSource.getRepository(User);
        const { email, password } = req.body;

        const dto = new CreateUserDto();
        dto.email = email;
        dto.password = password;

        const errors = await validate(dto);
        if (errors.length > 0) {
        return res.status(400).json({ errors });
        }

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepository.create({
        email,
        password: hashedPassword,
        });

        await userRepository.save(user);

        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).json(userWithoutPassword);
    }

    //LOGIN
    static async login(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
    }


}
