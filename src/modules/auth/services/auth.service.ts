import { SignInDto, SignUpDto } from "../dto/sign-up.dto";

export default class AuthService {
	constructor() {
		//
	}

	async signup(input: SignUpDto) {
		return { ...input };
	}

	async signin(input: SignInDto) {
		return { ...input };
	}

	async profile() {
		//
	}
}
