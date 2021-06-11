import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/media';

import { useSelector, useDispatch } from 'react-redux';
import { useMusicSlice } from 'store/musics';
import { selectMusics } from 'store/musics/selector';

import ReactPlayer from 'react-player';

import { PlayButton, CircleButton } from './PlayButton';
import { Progress } from './ProgressBar';
import { Music } from 'store/musics/types';
import { VolumeButton } from './VolumeButton';
import { AboutModal } from './AboutModal';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  background-color: #bfbfbf;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.5s;
  background-image: url('/images/Forest-pana.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: auto;
  width: 90%;
  height: 500px;

  background: rgba(0, 0, 0, 0.85);
  box-shadow: 9px 6px 32px 14px rgb(204 205 210 / 37%);

  ${media.small`
    flex-direction: row;
    width: 600px;
  `}

  ${media.medium`
    width: 800px;
  `}
`;

const ListWrapper = styled.div`
  width: 100%;
  color: #fff;
  overflow: hidden;
  position: relative;
  height: 250px;

  ul {
    list-style: none;
    height: calc(250px - 80px);
    overflow: auto;
    margin: 25px;
    margin-right: 0;
    margin-top: 0;
    padding: 0;
    padding-top: 25px;
    padding-right: 25px;
  }
  li {
    display: block;

    button {
      margin-right: 15px;
    }
  }

  ${media.small`
    height: 500px;
    width: 300px;
    ul {
    height: calc(500px - 120px);
    }
  `}

  ${media.medium`
    width: 400px;
  `}
`;

const VideoWrapper = styled.div`
  height: 250px;
  width: 100%;
  min-height: 250px;
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  ${media.small`
  height: 100%;
    width: 300px;
  `}

  ${media.medium`
    width: 400px;
  `}
`;
const VideoThumbWrapper = styled.div`
  height: 500px;
  width: 500px;
  transition: all 0.6s ease;
  opacity: ${props => `${props['data-hidden'] === false ? 1 : 0}`};
  position: absolute;
  display: flex;
  justify-content: center;
`;
const VideoThumb = styled.img`
  height: 100%;
  width: auto;
`;

const MusicItem = styled.li`
  display: flex;
  flex-direction: column;

  :not(:last-child) {
    margin-bottom: 25px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
`;
const Title = styled.span`
  cursor: pointer;
`;

const ControlPanelWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  /* display: none; */
  display: flex;
  width: 100%;
  padding: 15px 0px;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);

  ${media.small`
    /* display: flex; */
    width: 300px;
    padding: 35px 0px;
  `}

  ${media.medium`
    width: 400px;
  `}
`;
const ControlPanelLeftSection = styled.div`
  position: absolute;
  left: 25px;

  button:not(:last-child) {
    margin-right: 5px;
  }
`;
const ControlPanelRightSection = styled.div`
  position: absolute;
  right: 25px;

  button:not(:last-child) {
    margin-right: 5px;
  }
`;

export const MusicCard: React.FunctionComponent = () => {
  const VIDEO_THUMB = '/images/albums/Asuiro_ClearSky.jpg';

  const collections: Music[] = useSelector(selectMusics);

  const [currentId, setCurrentId] = React.useState(-1);
  const [progressValue, setProgressValue] = React.useState(0);
  const [durationValue, setDurationValue] = React.useState(0);

  const { actions } = useMusicSlice();
  const dispatch = useDispatch();

  const player = React.useRef<ReactPlayer | null>(null);
  const [videoReady, setVideoReady] = React.useState(false);
  const [videoThumbUrl, setVideoThumbUrl] = React.useState(VIDEO_THUMB);

  const [playing, setPlay] = React.useState(false);
  const [loop, setLoop] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const [url, setVideoUrl] = React.useState('');

  const [aboutModalShown, showAboutModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.loadMusics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleMusicButtonClick = index => {
    if (index === currentId) {
      setPlay(value => !value);
    } else {
      const musicItem = collections[index];
      if (musicItem) {
        setVideoThumbUrl(musicItem.coverImg);
        setVideoUrl(musicItem.youtubeUrl || '');
      }
      setCurrentId(currentId === index ? -1 : index);
      setProgressValue(0);
      setVideoReady(false);
      setPlay(true);
    }
  };
  const handleMusicTitleClick = index => {
    if (index === currentId) {
      // setPlay(value => !value);
    } else {
      const musicItem = collections[index];
      if (musicItem) {
        setVideoThumbUrl(musicItem.coverImg);
        setVideoUrl(musicItem.youtubeUrl || '');
      }
      setCurrentId(currentId === index ? -1 : index);
      setProgressValue(0);
      setVideoReady(false);
      setPlay(false);
    }
  };

  return (
    <Background>
      <PlayerWrapper>
        <ListWrapper>
          <ControlPanelWrapper>
            <PlayButton
              onClick={() => handleMusicButtonClick(currentId)}
              play={playing}
              disabled={currentId === -1}
              size="large"
            ></PlayButton>

            <ControlPanelLeftSection>
              <CircleButton
                title="Loop"
                onClick={() => setLoop(value => !value)}
                data-active={loop}
              >
                <span>&#8634;</span>
              </CircleButton>
            </ControlPanelLeftSection>

            <ControlPanelRightSection>
              <VolumeButton value={volume} setVolume={setVolume}></VolumeButton>
              <CircleButton
                title="About this Website"
                onClick={() => showAboutModal(true)}
              >
                <span>i</span>
                {/* info */}
              </CircleButton>
            </ControlPanelRightSection>
          </ControlPanelWrapper>

          <ul>
            {collections.length > 0 ? (
              collections.map((item, index) => (
                <MusicItem key={index}>
                  <TitleWrapper>
                    <div>
                      <PlayButton
                        onClick={() => handleMusicButtonClick(index)}
                        play={currentId === index && playing}
                      ></PlayButton>
                    </div>
                    <Title onClick={() => handleMusicTitleClick(index)}>
                      {item.title}
                    </Title>
                  </TitleWrapper>
                  <Progress
                    value={progressValue}
                    active={currentId === index}
                  ></Progress>
                </MusicItem>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </ul>
        </ListWrapper>
        <VideoWrapper>
          <VideoThumbWrapper data-hidden={videoReady}>
            <VideoThumb src={videoThumbUrl} alt="thumb"></VideoThumb>
          </VideoThumbWrapper>
          <ReactPlayer
            ref={player}
            url={url}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            loop={loop}
            stopOnUnmount={true}
            onReady={() => setVideoReady(true)}
            onEnded={() => setPlay(false)}
            onDuration={(duration: number) => {
              setDurationValue(duration);
              // console.log(duration);
            }}
            onProgress={(state: {
              played: number;
              playedSeconds: number;
              loaded: number;
              loadedSeconds: number;
            }) => {
              setProgressValue(
                Math.round((state.playedSeconds / durationValue) * 100),
              );
            }}
          ></ReactPlayer>
        </VideoWrapper>
      </PlayerWrapper>
      <AboutModal shown={aboutModalShown} close={() => showAboutModal(false)} />
    </Background>
  );
};
