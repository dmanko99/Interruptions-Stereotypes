# Analysis scripts:#
## Norming stimuli for main study: interruptions and racialized/gendered judgments ##
## preregistered at osf.io/ ##

#Set-up and reading in data#
library("tidyverse") # for all things tidyverse
library("dplyr")
library("pwr")
library("lme4")
library("lmerTest")
library("ggplot2")
library("bootstrap")
library("tm")

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

#Read in data
##experimental trial data
df <- read_csv("int_norming/data/int_norming/int_norming-trials.csv") %>%
  # remove bot check slides
  filter(!(type == "bot_check")) %>%
  # remove non-relevant columns
  select( -c(slide_number, slide_type, error)) %>%
  drop_na()
##subject information data
subinfo <-read.csv("int_norming/data/int_norming/int_norming-subject_information.csv",
                   header = TRUE)

#Helper scripts
dodge = position_dodge(.9)
theta <- function(x, xdata, na.rm=T) {
  mean(xdata[x],
       na.rm = na.rm)
  }
ci.low <- function(x,na.rm=T) {
  mean(x, na.rm = na.rm) - 
    quantile(
      bootstrap(
        1:length(x),
        1000,
        theta,
        x,
        na.rm = na.rm)$thetastar,
      .025,
      na.rm = na.rm)
  }
ci.high <- function(x,na.rm=T) {
  quantile(
    bootstrap(
      1:length(x),
      1000,
      theta,
      x,
      na.rm = na.rm)$thetastar,
    .975,
    na.rm = na.rm) - mean(x, na.rm = na.rm)
  }

#Sample size calculation:  check to see what the optimal sample size is
pwr.anova.test(k = 2,
               f = 0.4, #effect size that we would be happy about
               sig.level = 0.05,
               power = 0.8) %>% 
  plot()

# sanity check: should equal 50
length(unique(df$workerid))

# setting up relevant dataframes
df.aggregated <- df %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response))

df.female <- df %>% 
  filter(race_gender = "female") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response))

df.black_male <- df %>% 
  filter(race_gender = "b_male") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response))

df.white_male <- df %>% 
  filter(race_gender = "w_male") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response))


# performing t-tests for aggregate and each race/gender condition
## comparing match condition to mismatch condition
t.test(df.aggregated$avg_response ~ df.aggregated$condition)
t.test(df.female$avg_response ~ df.female$condition)
t.test(df.black_male$avg_response ~ df.black_male$condition)
t.test(df.white_male$avg_response ~ df.white_male$condition)