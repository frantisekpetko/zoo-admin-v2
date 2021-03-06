import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<import("../entity/user.entity").User>;
}
export {};
