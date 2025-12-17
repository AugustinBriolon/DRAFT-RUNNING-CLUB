const Hero = () => {
  return (
    <div className="h-dvh w-full bg-[url('/images/hero.png')] bg-cover bg-center py-[68px]">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between">
        <div className="flex items-end justify-between">
          <div className="flex items-end">
            <h1 aria-label="DRIFT RUNNING CLUB" className="flex flex-col text-right text-white">
              <div>DRIFT</div>
              <div>RUNNING</div>
              <div>CLUB/</div>
            </h1>
            <p className="flex items-center justify-center gap-3 text-xs text-white">
              <span>[</span>
              JOIN THE DRIFT
              <span>]</span>
            </p>
          </div>
          <div className="text-xs text-white">
            <p>BASED IN NEW</p>
            <div className="flex items-center justify-between">
              <p>YORK CITY</p>
              <div className="h-px w-4 bg-white"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="max-w-xs text-xs text-white">
            RUN WITH THE NIGHT, DRIFT WITH THE RYTHM, AND LET THE CITY CARRY YOUR FOWAED.
          </p>
          <p className="text-xs text-white">© 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
