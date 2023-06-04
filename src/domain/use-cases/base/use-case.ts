export abstract class UseCase<InputUseCaseProps, OutputUseCaseProps> {
  public abstract execute(props: InputUseCaseProps): Promise<OutputUseCaseProps>
}
